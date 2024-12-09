import React from 'react';
import { Card, Col, Row, Statistic, Typography, Tag, Button } from 'antd';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const ConfigUI = ({ config }) => {
    
  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <Card title="Config Overview" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="ID" value={config.id} />
          </Col>
          <Col span={12}>
            <Statistic title="Total Ticket Count" value={config.totalTicketCount} />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Statistic title="Maximum Ticket Count per Event" value={config.maximumTicketCountEvent} />
          </Col>
          <Col span={12}>
            <Statistic title="Vendor Limitation" value={config.vendorLimitation} />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Statistic title="Customer Limitation" value={config.customerLimitation} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Last Update"
              value={new Date(config.lastUpdate).toLocaleString()}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Title level={4}>System Status</Title>
            <Tag color={config.status == 'ACTIVE' ? 'green' : 'volcano'}>{config.status}</Tag>
          </Col>
        </Row>
      </Card>
    </div>
  );
};